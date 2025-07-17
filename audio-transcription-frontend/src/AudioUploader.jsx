import axios from "axios";
import { useState } from "react";

const AudioUploader = () => {

    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setLoading(true);

        try{

            setFile(e.target.files[0]);

        } catch (error) {

            console.error("Error Uploading File : ", error);

        } finally {

            setLoading(false)

        }

    };

    const handleUpload = async () => {

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            
            const response = await axios.post('http://localhost:8080/api/transcribe', formData, {

                headers : {
                    "Content-Type": 'multipart/form-data',
                }

            });

            setTranscription(response.data);

        } catch (error) {
            
            console.error("Error transcribing Audio : ", error);

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <div className="flex bg-green-500 justify-center items-center p-2">
                <h1 className="text-4xl text-shadow-black font-black">Audio to Text Transcriber</h1>
            </div>
            <div className="flex space-x-1.5 justify-center items-center mt-1.5">
                <label htmlFor="file-upload" className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200">
                    {file ? 'Audio Uploaded' : 'Upload Audio'}
                </label>
                <input id="file-upload" type="file" accept="audio/*" onChange={handleChange} className="hidden" />
                <button 
                className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
                onClick={handleUpload} disabled={loading}>
                    {loading ? 'Transcribing...' : 'Upload and Transcribe'}
                </button>
            </div>
            <div className="flex justify-center mt-1.5 h-screen">
                <div className="flex justify-center h-1/2 w-1/2 bg-stone-300 rounded-lg">
                    <h2 className="text-xl font-bold">Transcription Result</h2>
                    <p>{transcription}</p>
                </div>
            </div>
        </>

    );

}

export default AudioUploader;