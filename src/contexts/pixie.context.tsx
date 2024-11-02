import { createContext, useContext, useState, ReactNode } from 'react';
import { Pixie } from "../../local_modules/pixie";
import { PixieConfig } from '../../local_modules/pixie/dist/types/src/config/default-config';
import { EditorMode } from '../../local_modules/pixie/dist/types/src/config/editor-mode';

// Tạo một context cho Pixie
const PixieContext = createContext<
    {
        pixieInstance: Pixie | null,
        initializePixie: (config: PixieConfig) => void
    } | null>(null);

export const PixieProvider = ({ children }: { children: ReactNode }) => {
    const [pixieInstance, setPixieInstance] = useState<Pixie | null>(null);

    const initializePixie = (config: PixieConfig) => {
        if (pixieInstance) {
            pixieInstance.open({ image: config.image, selector: config.selector });
        } else {
            Pixie.init({
                baseUrl: 'pixie',
                crossOrigin: false,
                ui: {
                    mode: 'overlay' as EditorMode,
                    menubar: {
                        items: [
                            {
                                type: 'button',
                                icon: [
                                    {
                                        tag: 'path',
                                        attr: {
                                            d: 'm11.99 18.54-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16zm0-11.47L17.74 9 12 13.47 6.26 9 12 4.53z',
                                        },
                                    },
                                ],
                                align: 'right',
                                position: 0,
                                action: editor => {
                                    editor.togglePanel('objects');
                                },
                            },
                            {
                                type: 'button',
                                icon: [
                                    {
                                        tag: 'path',
                                        attr: {
                                            d: 'M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z',
                                        },
                                    },
                                ],
                                align: 'left',
                                buttonVariant: 'outline',
                                menuItems: [
                                    {
                                        action: editor => {
                                            editor.tools.import.uploadAndReplaceMainImage();
                                        },
                                        label: 'Background Image',
                                    },
                                    {
                                        action: editor => {
                                            editor.tools.import.uploadAndAddImage();
                                        },
                                        label: 'Overlay Image',
                                    },
                                    {
                                        action: editor => {
                                            editor.tools.import.uploadAndOpenStateFile();
                                        },
                                        label: 'Editor Project File',
                                    },
                                ],
                            },
                        ],
                    },
                },
                ...config
            }).then((pixie) => {
                setPixieInstance(pixie);
            });
        }
    };

    return (
        <PixieContext.Provider value={{ pixieInstance, initializePixie }}>
            {children}
        </PixieContext.Provider>
    );
};

// Hook để sử dụng Pixie context
export const usePixie = () => {
    const context = useContext(PixieContext);
    if (!context) {
        throw new Error('usePixie must be used within a PixieProvider');
    }
    return context;
};