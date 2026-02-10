import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload, FaVideo, FaCheckCircle, FaSpinner } from "react-icons/fa";

interface Props {
  courseId: string;
}

const InstructorVideoUpload = ({ courseId }: Props) => {
  const [video, setVideo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>("");

  useEffect(() => {
    // Fetch current course video if exists
    const fetchCourseVideo = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        if (res.data.course?.videoUrl) {
          setCurrentVideoUrl(res.data.course.videoUrl);
          setPreview(res.data.course.videoUrl);
        }
      } catch (err) {
        console.error("Error fetching course video:", err);
      }
    };

    if (courseId) {
      fetchCourseVideo();
    }
  }, [courseId]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setVideo(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setUploaded(false);
    }
  };

  const uploadVideo = async () => {
    if (!video) {
      alert("Please select a video file");
      return;
    }

    if (!courseId) {
      alert("Course ID is missing. Please create the course first.");
      return;
    }

    setUploading(true);
    setUploaded(false);

    const formData = new FormData();
    formData.append("video", video);

    try {
      const res = await axios.post(
        `http://localhost:8080/video/upload-video/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      const videoUrl = res.data.videoUrl;
      setCurrentVideoUrl(videoUrl);
      setPreview(videoUrl);
      setUploaded(true);
      setVideo(null);
      
      // Update course in database to ensure videoUrl is saved
      try {
        await axios.patch(`http://localhost:8080/api/courses/${courseId}`, {
          videoUrl: videoUrl
        });
      } catch (err) {
        console.error("Error updating course:", err);
      }
      
      alert("Video uploaded successfully! Students who purchased this course can now view it.");
    } catch (err: any) {
      console.error("Upload error:", err);
      alert(err.response?.data?.error || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px",
        background: "#fff",
        borderRadius: "8px",
      }}
    >
      <div style={{ marginBottom: "32px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#1c1d1f",
          }}
        >
          Upload Course Video
        </h2>
        <p style={{ fontSize: "14px", color: "#6a6f73" }}>
          Upload a video for your course. Students who purchase this course will be able to view it.
        </p>
      </div>

      {/* Upload Section */}
      <div
        style={{
          border: "2px dashed #d1d7dc",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center",
          marginBottom: "24px",
          background: "#f7f9fa",
        }}
      >
        <FaVideo style={{ fontSize: "48px", color: "#a435f0", marginBottom: "16px" }} />
        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px" }}>
          Select Video File
        </h3>
        <p style={{ fontSize: "14px", color: "#6a6f73", marginBottom: "24px" }}>
          Supported formats: MP4, MOV, AVI (Max 500MB)
        </p>

        <label
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "#a435f0",
            color: "#fff",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "700",
            fontSize: "14px",
          }}
        >
          <FaUpload style={{ marginRight: "8px", display: "inline" }} />
          Choose File
          <input
            type="file"
            accept="video/*"
            onChange={handleFile}
            style={{ display: "none" }}
            disabled={uploading}
          />
        </label>

        {video && (
          <div style={{ marginTop: "16px" }}>
            <p style={{ fontSize: "14px", color: "#1c1d1f" }}>
              Selected: <strong>{video.name}</strong> ({(video.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {video && (
        <div style={{ marginBottom: "24px" }}>
          <button
            onClick={uploadVideo}
            disabled={uploading}
            style={{
              width: "100%",
              padding: "14px",
              background: uploading ? "#6a6f73" : "#a435f0",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: uploading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {uploading ? (
              <>
                <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
                Uploading...
              </>
            ) : (
              <>
                <FaUpload />
                Upload Video
              </>
            )}
          </button>
        </div>
      )}

      {/* Success Message */}
      {uploaded && (
        <div
          style={{
            padding: "16px",
            background: "#d4edda",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaCheckCircle style={{ color: "#28a745", fontSize: "20px" }} />
          <span style={{ color: "#155724", fontWeight: "700" }}>
            Video uploaded successfully! Students can now view it.
          </span>
        </div>
      )}

      {/* Preview Section */}
      {preview && (
        <div style={{ marginTop: "32px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "16px" }}>
            Video Preview
          </h3>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              background: "#000",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <video
              src={preview}
              controls
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          {currentVideoUrl && (
            <p style={{ fontSize: "12px", color: "#6a6f73", marginTop: "8px" }}>
              Current video URL: {currentVideoUrl}
            </p>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default InstructorVideoUpload;
