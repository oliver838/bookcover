import axios from "axios";
import { addDoc, collection, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from "./fireBaseApp";
import imageCompression from "browser-image-compression";
const apiKey = import.meta.env.VITE_IMGBB_API_KEY
const imgbbUrl ="https://api.imgbb.com/1/upload?key="+apiKey
const uploadToIMGBB = async(file) => {
    const formData = new FormData()
    formData.append("image",file)
    try{
        const response = await axios.post(imgbbUrl, formData)
        const {url,delete_url} = response.data.data
        return {url, delete_url}
    }catch(error){
        console.log("Képfeltöltési hiba");
    }
}

export const addRecipe=async(recipe,file)=>{
    try {
        let imgUrl = ""
        let deleteUrl = ""
        const compressed = await imageCompression(file,{maxWidthOrHeight:800,useWebWorker:true})
        const result = await uploadToIMGBB(compressed)
        if(result) {
            imgUrl = result.url
            deleteUrl = result.delete_url
            console.log(result);
            
        const collectionRef = collection(db,'recipes')
        await addDoc(collectionRef, {...recipe, imgUrl, deleteUrl, timestamp:serverTimestamp()})
        }
    } catch (error) {
        console.log("Nem sikerült hozzáadni!" + error);
        
    }
}