import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function ViewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [gitHubUrl, setGitHubUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [tag, setTag] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `https://portfolio-backend-op5p.onrender.com/api/v1/project/getSingleProject/${id}`,
          { withCredentials: true }
        );
        const p = res.data.project;
        setTitle(p.title);
        setDescription(p.Description);
        setDemoUrl(p.demoUrl ?? "Not available yet");
        setGitHubUrl(p.gitHubUrl ?? "Not available yet");
        setImageFile(p.image.url);
        setTag(p.tags);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    getProject();
  }, [id]);

  const descriptionInListFormate = description.split(".");

  if (loading) {
    return (
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-2">
      <main className="grid flex-1 items-start gap-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 p-4">
          <div className="flex justify-between items-center bg-muted/40">
            <h1 className="text-center text-2xl font-bold tracking-tight dark:text-gray-100">
              View Project
            </h1>
            <Link to={"/"}>
              <Button>Back to Dashboard</Button>
            </Link>
          </div>

          <div className="flex justify-center px-4 py-10">
            <div className="w-full max-w-4xl space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
              <h1 className="text-3xl font-bold text-foreground mb-4 text-center">
                {title}
              </h1>

              {imageFile && (
                <img
                  src={imageFile}
                  alt="Project"
                  className="w-full h-80 object-contain rounded-md shadow"
                />
              )}

              {/* Description */}
              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Description</h2>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  {descriptionInListFormate.map((item, index) =>
                    item.trim() ? <li key={index}>{item.trim()}</li> : null
                  )}
                </ul>
              </section>

              {/* Tags */}
              <section className="space-y-2">
                <h2 className="text-xl font-semibold">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {tag.map((item, index) => (
                    <Badge key={index} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* Demo & GitHub Links */}
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Demo URL</h2>
                  {demoUrl.startsWith("http") ? (
                    <Button
                      asChild
                      variant="link"
                      className="p-0 text-blue-600 hover:underline"
                    >
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {demoUrl}
                      </a>
                    </Button>
                  ) : (
                    <p className="text-gray-500 italic">{demoUrl}</p>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold">GitHub URL</h2>
                  {gitHubUrl.startsWith("http") ? (
                    <Button
                      asChild
                      variant="link"
                      className="p-0 text-blue-600 hover:underline"
                    >
                      <a
                        href={gitHubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {gitHubUrl}
                      </a>
                    </Button>
                  ) : (
                    <p className="text-gray-500 italic">{gitHubUrl}</p>
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ViewProject;
