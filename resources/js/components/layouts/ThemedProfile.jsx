import { useState, useRef, useCallback } from 'react';
import { Avatar, Text, Slider, Group, FileButton, ActionIcon, Indicator, Drawer, Badge } from '@mantine/core';
import { IconUpload, IconRotateClockwise, IconRotate2, IconCheck, IconPhotoEdit, IconLogout, IconBell, IconChevronDown, IconX } from '@tabler/icons-react';
import Cropper from 'react-easy-crop';
import axios from 'axios';
import { router } from '@inertiajs/react';
import ThemedButton from '../themed/ThemedButton';
import ThemedModal from '../themed/ThemedModal';

// Helper function to create the cropped image
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
}

async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);
    ctx.drawImage(image, safeArea / 2 - image.width / 2, safeArea / 2 - image.height / 2);

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width / 2 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height / 2 - pixelCrop.y)
    );

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(file);
        }, 'image/jpeg');
    });
}

export default function ThemedProfile({ user }) {
    const [opened, setOpened] = useState(false);
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleFileSelect = async (file) => {
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result));
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setIsUploading(true);
            const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);

            const formData = new FormData();
            formData.append('profile_pic', croppedImageBlob, 'profile.jpg');

            await axios.post('/api/user/profile-pic', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Reload page to get new picture
            router.reload();
            setOpened(false);
            setImageSrc(null);
        } catch (e) {
            console.error('Error uploading image', e);
        } finally {
            setIsUploading(false);
        }
    };

    const userInitials = user.name ? user.name.charAt(0).toUpperCase() : '?';
    const profilePicUrl = user.profile_pic ? (user.profile_pic.startsWith('http') ? user.profile_pic : `/storage/${user.profile_pic}`) : null;

    return (
        <>
            {/* Avatar */}
            <Avatar
                src={profilePicUrl}
                onClick={() => setDrawerOpened(true)}
                radius="lg"
                size="50px"
                className="shadow-sm cursor-pointer"
                style={{ background: 'var(--od-brand-gradient)', color: 'var(--od-white)' }}
            >
                {userInitials}
            </Avatar>

            {/* Right Sidebar Backdrop */}
            {drawerOpened && (
                <div
                    className="fixed inset-0 z-[60] bg-black/5 backdrop-blur-sm transition-opacity"
                    onClick={() => setDrawerOpened(false)}
                />
            )}

            {/* Profile Floaty Sidebar */}
            <aside
                className={`
                    fixed top-4 right-4 z-[70] h-[calc(30vh-32px)] w-[285px] flex flex-col p-5
                    transition-transform duration-300 ease-in-out
                    border border-gray-100 shadow-xl shadow-gray-200/50 rounded-3xl bg-white
                    ${drawerOpened ? 'translate-x-0' : 'translate-x-[120%]'}
                `}
            >
                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    {/* Navigation Items (Profile actions styled as Sidebar NavItems) */}
                    <nav className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-1 flex-1">
                        <button
                            onClick={() => {
                                setDrawerOpened(false);
                                setOpened(true);
                            }}
                            className={`
                                flex items-center gap-3 w-full px-4 py-3
                                rounded-[1.25rem] transition-all duration-300 ease-out cursor-pointer
                                font-semibold shadow-md translate-x-1
                            `}
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                color: 'var(--od-white)',
                                background: 'var(--od-brand-gradient)'
                            }}
                        >
                            <IconPhotoEdit size={22} stroke={2} />
                            <span className="text-sm tracking-wide">Update Picture</span>
                        </button>

                        <button
                            onClick={() => router.post('/logout')}
                            className={`
                                flex items-center gap-3 w-full px-4 py-3
                                rounded-[1.25rem] transition-all duration-300 ease-out cursor-pointer
                                font-medium hover:bg-gray-100 hover:translate-x-1
                            `}
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                color: 'var(--od-gray-600)'
                            }}
                        >
                            <IconLogout size={22} stroke={1.5} />
                            <span className="text-sm tracking-wide">Log out</span>
                        </button>
                    </nav>
                </div>
            </aside>

            <ThemedModal
                opened={opened}
                onClose={() => { setOpened(false); setImageSrc(null); setZoom(1); setRotation(0); }}
                title="Update Profile Picture"
            >
                {!imageSrc ? (
                    <div className="flex flex-col items-center justify-center p-12 mt-2 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/20 hover:bg-gray-50/80 transition-colors shadow-[0_0_20px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-center w-[72px] h-[72px] mb-6 bg-white rounded-full shadow-sm text-indigo-500 border border-indigo-50">
                            <IconUpload size={32} stroke={1.5} />
                        </div>
                        <h3 className="text-[17px] font-bold text-[#001f3f] mb-1.5 tracking-tight">Upload a new photo</h3>
                        <p className="text-[13px] font-medium text-gray-500 mb-8 text-center max-w-[200px] leading-relaxed">
                            We support PNG, JPG, or GIF files up to 5MB.
                        </p>
                        <FileButton onChange={handleFileSelect} accept="image/png,image/jpeg,image/gif">
                            {(props) => (
                                <ThemedButton
                                    {...props}
                                    variant="primary"
                                    size="md"
                                    style={{ background: 'var(--od-brand-gradient)', color: 'var(--od-white)' }}
                                >
                                    Browse Files
                                </ThemedButton>
                            )}
                        </FileButton>
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 mt-4">
                        <div className="relative w-full h-72 bg-gray-900 rounded-2xl overflow-hidden shadow-inner">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={1} // Square
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                            />
                        </div>

                        <div className="px-1">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Zoom</span>
                                <span className="text-xs font-semibold text-gray-900">{Math.round(zoom * 100)}%</span>
                            </div>
                            <Slider
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                onChange={setZoom}
                                color="indigo.5"
                                size="md"
                                marks={[{ value: 1, label: '1x' }, { value: 2, label: '2x' }, { value: 3, label: '3x' }]}
                            />
                        </div>

                        <div className="px-1 mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rotation</span>
                                <span className="text-xs font-semibold text-gray-900">{rotation}°</span>
                            </div>
                            <Group gap="sm" wrap="nowrap">
                                <ActionIcon variant="light" color="gray" size="lg" radius="xl" onClick={() => setRotation(r => r - 90)} className="hover:bg-gray-100 text-gray-600">
                                    <IconRotate2 size={18} />
                                </ActionIcon>
                                <Slider
                                    value={rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    onChange={setRotation}
                                    className="flex-1"
                                    color="indigo.5"
                                    size="md"
                                    label={null}
                                />
                                <ActionIcon variant="light" color="gray" size="lg" radius="xl" onClick={() => setRotation(r => r + 90)} className="hover:bg-gray-100 text-gray-600">
                                    <IconRotateClockwise size={18} />
                                </ActionIcon>
                            </Group>
                        </div>

                        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                            <ThemedButton
                                variant="outline"
                                size="md"
                                onClick={() => setImageSrc(null)}
                                className="flex-1"
                            >
                                Cancel
                            </ThemedButton>
                            <ThemedButton
                                variant="gradient"
                                size="md"
                                onClick={handleSave}
                                isLoading={isUploading}
                                className="flex-1 flex gap-2 items-center justify-center"
                            >
                                <IconCheck size={18} stroke={2} />
                                Save Picture
                            </ThemedButton>
                        </div>
                    </div>
                )}
            </ThemedModal>
        </>
    );
}
