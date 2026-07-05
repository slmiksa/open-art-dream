import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange?: (url: string | undefined) => void;
  aspect?: "video" | "square" | "wide";
  label?: string;
}

const aspectClass: Record<string, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export function ImageUpload({ value, onChange, aspect = "video", label = "الصورة" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange?.(url);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div
        className={`relative overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/30 ${aspectClass[aspect]}`}
      >
        {preview ? (
          <>
            <img src={preview} alt="preview" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => {
                setPreview(undefined);
                onChange?.(undefined);
                if (inputRef.current) inputRef.current.value = "";
              }}
              className="absolute end-2 top-2 rounded-full bg-background/90 p-1.5 text-foreground shadow hover:bg-background"
              aria-label="إزالة الصورة"
            >
              <X className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground transition hover:bg-muted/50"
          >
            <Upload className="h-8 w-8" />
            <span className="text-sm">اضغط لرفع صورة من جهازك</span>
            <span className="text-xs opacity-70">PNG · JPG · WEBP</span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
      {preview && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="ms-2 h-4 w-4" />
          استبدال الصورة
        </Button>
      )}
    </div>
  );
}
