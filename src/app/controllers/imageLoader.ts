interface Props {
  src: string;
  local:boolean
}
import AXIOS from "@/app/config/axios";

export default function customImageLoader({ src,local }: Props) {
  try {
     const encode = encodeURIComponent(btoa(src.trim()));
    console.log(src)
    const baseURL = local
      ? "http://localhost:3005/redbox/api" // URL de localhost
      : AXIOS.defaults.baseURL; // URL pública en producción
    console.log(baseURL)
    return baseURL + "/imagen/" + encode;
  } catch (error) {
    console.error("Error encoding image URL:", error);
    return src; // Devolver la URL original en caso de error
  }
}
