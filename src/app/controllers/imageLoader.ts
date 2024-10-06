interface Props {
  src: string;
}
import AXIOS from "@/app/config/axios";

export default function customImageLoader({ src }: Props) {
  try {
    const encode = encodeURIComponent(btoa(src.trim()));
    const baseURL = AXIOS.defaults.baseURL;
    return baseURL + "/imagen/" + encode;
  } catch (error) {
    console.error("Error encoding image URL:", error);
    return src; // Devolver la URL original en caso de error
  }
}
