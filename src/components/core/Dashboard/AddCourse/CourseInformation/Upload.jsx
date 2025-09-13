import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FiUploadCloud } from "react-icons/fi"
import ReactPlayer from "react-player"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  )
  const inputRef = useRef(null)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewSource(url)
      setSelectedFile(file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: video ? { "video/mp4": [] } : { "image/*": [] },
    maxSize: video ? 50 * 1024 * 1024 : 5 * 1024 * 1024,
    onDrop,
  })

  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  useEffect(() => {
    setValue(name, selectedFile)
  }, [selectedFile, setValue, name])

  const handleCancel = () => {
    if (previewSource?.startsWith("blob:")) {
      URL.revokeObjectURL(previewSource)
    }
    setPreviewSource("")
    setSelectedFile(null)
    setValue(name, null)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
              
            ) : (
          <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black">
  <video
    src={previewSource}
    controls
    className="absolute top-0 left-0 w-full h-full object-cover bg-black rounded-lg"
  />
</div>

            )}
            {!viewData && (
              <button
                type="button"
                onClick={handleCancel}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input id={name} {...getInputProps()} ref={inputRef} />
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop a {video ? "video" : "image"}, or{" "}
              <label
                htmlFor={name}
                className="cursor-pointer font-semibold text-yellow-50"
              >
                browse
              </label>
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
              {video && <li>Max size: 50MB</li>}
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}
