import { Button, Tabs } from 'antd';
import { useState } from 'react';
import ImageCard from '../components/card/image.card';
import { useTheme } from '../contexts/theme.context';

export interface Image {
    id: number;
    url: string;
}

const images: Image[] = [1, 2, 3, 4, 5, 6, 7, 8].map((id) => ({ id, url: `https://lipsum.app/id/24/800x600` }));

const HomePage = () => {
    const [url, setUrl] = useState('');
    const [selected, setSelected] = useState<number[]>([]);
    const { theme: themeContext } = useTheme();

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleExtract = () => {
        console.log("Extracting images from:", url);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div>
            <section className="flex flex-col items-center justify-center bg-[#27272a] text-white p-10">
                <h1 className="text-5xl font-bold mb-4 text-white text-center">Extract images</h1>
                <p className="text-gray-400 mb-8 text-2xl text-center">from any public website</p>

                <div className="bg-white p-6 rounded-lg shadow-lg flex space-x-2 md:w-3/5">
                    <div className="flex flex-col space-y-1 w-full">
                        <Tabs
                            onChange={onChange}
                            type="card"
                            items={[
                                {
                                    label: 'Single Site',
                                    key: '1',
                                    children: (
                                        <div className="flex flex-row space-y-1">
                                            <input
                                                type="text"
                                                placeholder="Enter any URL like https://example.com"
                                                className="w-full px-4 border rounded focus:outline-none"
                                                value={url}
                                                onChange={handleUrlChange}
                                            />
                                            <button
                                                className="px-6 py-2 ml-2 font-medium bg-black text-white rounded shadow"
                                                onClick={handleExtract}
                                            >
                                                Extract
                                            </button>
                                        </div>
                                    ),
                                },
                                { label: 'Multiple Sites', key: '2', children: <></> },
                            ]}
                        />
                    </div>
                </div>
            </section>
            <div className={`flex flex-col lg:flex-row min-h-screen ${themeContext === 'light' ? 'bg-[#fafafa]' : 'bg-[#27272a]'} p-10`}>
                {/* Cột bên trái */}
                <div className="w-full lg:w-1/4 p-4 bg-white border-r border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Sort images</h2>
                    <select className="w-full p-2 mb-4 border border-gray-300 rounded">
                        <option>Image size</option>
                    </select>

                    <h2 className="text-xl font-semibold mb-4">Filter images by type</h2>
                    <div className="flex flex-wrap mb-4 gap-2">
                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded">PNG</button>
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded">JPEG</button>
                        <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded">GIF</button>
                        <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">SVG</button>
                    </div>

                    <input
                        type="text"
                        placeholder="Search for images"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />

                    <h2 className="text-xl font-semibold mb-4">Download</h2>
                    <Button className="w-full bg-gray-200 p-2 rounded mb-2" onClick={() => setSelected(images.map((image) => image.id))}>Select all</Button>
                    <Button className="w-full bg-gray-200 p-2 rounded mb-2" onClick={() => setSelected([])}>Deselect all</Button>
                    <Button className="w-full bg-green-500 text-white p-2 rounded mt-4">Download selected</Button>
                </div>

                {/* Cột bên phải */}
                <div className="w-full lg:w-3/4 p-4">
                    <div className="flex flex-row justify-between ">
                        <h1 className={`text-2xl font-bold mb-4 ${themeContext === 'light' ? 'text-black' : 'text-white'}`}>{`Showing ${8} of ${images.length} images from ${url}`}</h1>
                        <div className={`flex space-x-2`}>
                            {Array.from({ length: Math.ceil(images.length / 8) }, (_, index) => (
                                <Button
                                    key={index}
                                    className={`rounded p-2 font-medium ${themeContext === 'light' ? 'text-black' : 'text-white'}`}
                                    type="text"
                                    onClick={() => console.log(`Page ${index + 1}`)}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Grid hiển thị hình ảnh */}
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((image) => (
                            <ImageCard key={image.id} image={image} selected={selected} setSelected={setSelected} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
