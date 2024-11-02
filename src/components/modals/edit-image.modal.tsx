import React, { memo } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { usePixie } from '../../contexts/pixie.context';
import { Image } from '../../pages/home.page';

interface IProps {
    image: Image;
    imageRef: React.RefObject<HTMLImageElement>;
}

const EditImageModal: React.FC<IProps> = memo(({ image, imageRef }) => {
    const { initializePixie } = usePixie();

    const handleIconClick = () => {
        initializePixie({
            selector: `#container-${image.id}`,
            image: imageRef.current?.src,
        });
    };

    return (
        <>
            <Button
                className="custom-hover-button"
                type="text"
                icon={<EditOutlined />}
                onClick={(e) => {
                    e.stopPropagation();
                    handleIconClick();
                }}
            />
            <div id={`container-${image.id}`} />
        </>
    );
});

export default EditImageModal;
