import axios from "axios";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query,  serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
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
export const readRecipe = async (setRecipes,setLoading) =>{
   
        const collectionRef = collection(db,'recipes')
        const q = query(collectionRef, orderBy("timestamp","desc"))
        const unsubscribe = onSnapshot(q,(snapshot)=>{
            setRecipes(snapshot.docs.map(doc=>({...doc.data(), id:doc.id})))
            setLoading(false)
        })
        
        
        return unsubscribe
}
export const deleteRecipe = async (id,delete_url) =>{
    const docRef = doc(db,'recipes',id)
    await deleteDoc(docRef)
}

export const readRecip = async (id,setRecipe)=>{
    const docRef= doc(db,'recipes',id)
    const docData = await getDoc(docRef)
    setRecipe(docData.data())
}

export const updateRecipe = async (id,updatedData,file)=>{
    let imgUrl=updatedData.imgUrl || ''
    let deleteUrl=updatedData.deleteUrl || ''
    try {
        if(file){
            const compressed = await imageCompression(file,{maxWidthOrHeight:800,useWebWorker:true})
            const result = await uploadToIMGBB(compressed)
            if(result){
                imgUrl = result.url
                deleteUrl = result.delete_url
            }
        }
        const docRef = doc(db,'recipes',id)
        await updateDoc(docRef, {...updatedData,imgUrl,deleteUrl,updatedAt:serverTimestamp})
    } catch (error) {
        console.log("Nem sikerült a módosytás",error);
        
    }
}