import { Tabs } from 'antd';
import { useState } from 'react';
const HomePage = () => {
    const [url, setUrl] = useState('');

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handleExtract = () => {
        // Xử lý logic lấy hình ảnh từ URL ở đây
        console.log("Extracting images from:", url);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

    return (
        <div>
            <section className="flex flex-col items-center justify-center bg-[#27272a] text-white p-10">
                <h1 className="text-5xl font-bold mb-4">Extract images</h1>
                <p className="text-gray-400 mb-8 text-2xl">from any public website</p>

                <div className="bg-white p-6 rounded-lg shadow-lg flex space-x-2 w-1/3">
                    <div className="flex flex-col space-y-1 w-full">
                        <Tabs
                            onChange={onChange}
                            type="card"
                            items={[{
                                label: 'Single Site', key: '1', children:
                                    <div className='flex flex-row space-y-1'>
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
                            }, { label: 'Multiple Sites', key: '2', children: <></> }]}
                        />
                    </div>
                </div>
            </section>
            <div className="flex min-h-screen bg-gray-100 p-10">
                {/* Cột bên trái */}
                <div className="w-1/4 p-4 bg-white border-r border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Sort images</h2>
                    <select className="w-full p-2 mb-4 border border-gray-300 rounded">
                        <option>Image size</option>
                        {/* Thêm các tùy chọn khác nếu cần */}
                    </select>

                    <h2 className="text-xl font-semibold mb-4">Filter images by type</h2>
                    <div className="flex flex-wrap mb-4 gap-2">
                        <button className="bg-green-100 text-green-700 px-3 py-1 rounded">PNG</button>
                        <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded">JPEG</button>
                        <button className="bg-purple-100 text-purple-700 px-3 py-1 rounded">GIF</button>
                        <button className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded">SVG</button>
                        <button className="bg-pink-100 text-pink-700 px-3 py-1 rounded">WEBP</button>
                    </div>

                    <input
                        type="text"
                        placeholder="Search for images"
                        className="w-full p-2 mb-4 border border-gray-300 rounded"
                    />

                    <h2 className="text-xl font-semibold mb-4">Download</h2>
                    <button className="w-full bg-gray-200 p-2 rounded mb-2">Select all</button>
                    <button className="w-full bg-gray-200 p-2 rounded mb-2">Deselect all</button>

                    <button className="w-full bg-green-500 text-white p-2 rounded mt-4">Download selected</button>
                </div>

                {/* Cột bên phải */}
                <div className="w-3/4 p-4">
                    <h1 className="text-2xl font-bold mb-4">Showing 48 of 657 images from icons8.com</h1>

                    {/* Grid hiển thị hình ảnh */}
                    <div className="grid grid-cols-3 gap-4">
                        {[...Array(12)].map((_, index) => (
                            <div key={index} className="bg-white shadow rounded overflow-hidden border border-gray-200">
                                <img src="https://cdn.pixabay.com/photo/2023/09/21/11/30/cat-8266486_1280.jpg" alt="Image" className="w-full h-auto" />
                                <div className="p-2 flex justify-between items-center text-sm">
                                    <span>WEBP</span>
                                    <span>26 KB</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;