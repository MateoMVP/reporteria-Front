import AXIOS from "@/app/config/axios";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface request {
  KioskId: string;
  nota: string;
  name_tecnico: string;
  PictBOX?: File | string | null;
  PictBef?: File | string | null;
  PictDef?: File | string | null;
  PictAft?: File | string | null;
  field: string;
  fecha: string;
}

export default function useModifyReport(id: string, name?: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { handleSubmit, handleChange, setFieldValue, values } =
    useFormik<request>({
      initialValues: {
        fecha: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0],
        KioskId: "",
        field: "",
        nota: "",
        name_tecnico: name || "",
        PictBOX: undefined,
        PictBef: undefined,
        PictDef: undefined,
        PictAft: undefined,
      },
      onSubmit: async (values) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("KioskId", values.KioskId);
        formData.append("nota", values.nota);
        formData.append("name_tecnico", values.name_tecnico);
        formData.append("fecha", values.fecha);
        if (values.PictBOX) {
          formData.append("PictBOX", values.PictBOX);
        }
        if (values.PictBef) {
          formData.append("PictBef", values.PictBef);
        }
        if (values.PictDef) {
          formData.append("PictDef", values.PictDef);
        }
        if (values.PictAft) {
          formData.append("PictAft", values.PictAft);
        }
        if (values.field) {
          formData.append("field", values.field);
        }
        if (values.fecha) {
          console.log("values.fecha",typeof values.fecha);
          formData.append("fecha", values.fecha);
        }
        try {
          await AXIOS.patch("/actualizar_reporte/" + id, formData);
          setSuccess(true);
          toast.success("Report created successfully");
          // router.push("/dashboard");
        } catch (error) {
          console.error("Error creating report", error);
          toast.error("Error creating report");
        } finally {
          setLoading(false);
        }
      },
    });

  return {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    loading,
    error,
    success,
  };
}
