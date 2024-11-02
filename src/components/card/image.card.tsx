import { useRef, useState } from 'react';
import cardSelected from '../../assets/selected.svg';
import { Button } from 'antd';
import { DownloadOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import EditImageModal from '../modals/edit-image.modal';
import { Image } from '../../pages/home.page';

interface ImageCardProps {
    image: Image;
    selected: number[];
    setSelected: (selected: number[]) => void;
}

const ImageCard = ({ image, selected, setSelected }: ImageCardProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const imageRef = useRef<HTMLImageElement>(null);
    const [iconState, setIconState] = useState({
        copy: false,
        download: false,
        edit: false,
    });

    const handleSelect = (index: number) => {
        if (selected.includes(index)) {
            setSelected(selected.filter((i) => i !== index));
        } else {
            setSelected([...selected, index]);
        }
    };

    const handleIconClick = (icon: keyof typeof iconState) => {
        // Thay đổi trạng thái biểu tượng sang true
        setIconState((prevState: typeof iconState) => ({
            ...prevState,
            [icon]: true,
        }));

        // Khôi phục trạng thái về false sau 2 giây
        setTimeout(() => {
            setIconState((prevState: typeof iconState) => ({
                ...prevState,
                [icon]: false,
            }));
        }, 2000);
    };

    return (
        <div
            key={image.id}
            onClick={() => handleSelect(image.id)}
            onMouseEnter={() => setHovered(image.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative bg-white shadow rounded overflow-hidden border border-gray-200 cursor-pointer 
                ${hovered === image.id ? "animate-pop-out" : ""}`}
        >
            {/* Circle for hover/select state */}
            {(hovered === image.id || selected.includes(image.id)) && (
                <div
                    className={`absolute top-2 left-2 w-6 h-6 flex items-center justify-center rounded-full bg-white
                                        ${hovered === image.id && !selected.includes(image.id) ? "animate-grow-circle" : ""}`}
                >
                    {selected.includes(image.id) ? (
                        <div className="w-full h-full flex items-center justify-center rounded-full bg-green-500 animate-grow-circle">
                            <img src={cardSelected} alt="Selected" className="w-4 h-4" />
                        </div>
                    ) : null}
                </div>
            )}

            {/* Image */}
            <img
                src="https://lipsum.app/id/24/800x600"
                alt="Image"
                className="w-full h-auto"
                ref={imageRef}
            />

            {/* Footer */}
            <div className="p-2 flex justify-between items-center text-sm">
                <div className="flex flex-row gap-1">
                    <span className="text-gray-500 border border-gray-200 rounded-md px-1">WEBP</span>
                    <span className="text-gray-500 border border-gray-200 rounded-md px-1">26 KB</span>
                </div>
                <div>
                    <Button
                        className="custom-hover-button"
                        type="text"
                        icon={iconState.copy ? <CheckOutlined /> : <CopyOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleIconClick("copy");
                        }}
                    />
                    <Button
                        className="custom-hover-button"
                        type="text"
                        icon={iconState.download ? <CheckOutlined /> : <DownloadOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleIconClick("download");
                        }}
                    />
                    <EditImageModal imageRef={imageRef} image={image} />
                </div>
            </div>
        </div>
    );
};

export default ImageCard;   