"use client";
import React from "react";
import { Play } from "lucide-react";
import { useAudio } from "@/app/context/AudioContext";
import { useFetchAudioFiles } from "@/app/hooks/useFetchAudioFiles";

const Home = () => {
  const { audioFiles, isLoading } = useFetchAudioFiles();
  const { playAudio } = useAudio();

  return (
    <>
      <div className="h-full w-full px-4 py-2 overflow-y-auto">
        <h1 className="mb-2 text-2xl font-bold text-fgPrimary">
          Recently Played
        </h1>
        {/* Recently Played Cards */}
        <div className="flex flex-wrap gap-1">
          {isLoading ? (
            <div className="w-full text-center text-fgSecondary">
              Fetching music...
            </div>
          ) : audioFiles.length > 0 ? (
            audioFiles.map((file) => (
              <div
                key={file.name}
                className="p-2 hover:bg-bgSecondary rounded-lg w-36">
                <div className="flex flex-col text-fgPrimary group">
                  <div className="rounded-lg mb-1 relative">
                    <img
                      src={file.albumArt}
                      alt={file.name}
                      className="w-32 h-32 rounded-lg"
                    />
                    <button
                      className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent"
                      onClick={() => playAudio(file)}>
                      <Play
                        fill="#060606"
                        color="#060606"
                      />
                    </button>
                  </div>
                  <span className="text-sm px-1 text-ellipsis whitespace-nowrap overflow-hidden">
                    {file.name.replace(".mp3", "")}
                  </span>
                  <span className="text-sm px-1 text-fgSecondary">
                    {file.artist}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
          <div className="p-2 hover:bg-bgPrimary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgSecondary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgPrimary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgSecondary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
        </div>
        <h1 className="mt-6 mb-2 text-2xl font-bold text-fgPrimary">
          Playlists
        </h1>
        {/* Playlist Cards */}
        <div className="flex flex-wrap gap-1">
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
        </div>
        <h1 className="mt-6 mb-2 text-2xl font-bold text-fgPrimary">
          Playlists
        </h1>
        {/* Playlist Cards */}
        <div className="flex flex-wrap gap-1">
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
        </div>
        <h1 className="mt-6 mb-2 text-2xl font-bold text-fgPrimary">
          Playlists
        </h1>
        {/* Playlist Cards */}
        <div className="flex flex-wrap gap-1">
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
        </div>
        <h1 className="mt-6 mb-2 text-2xl font-bold text-fgPrimary">
          Playlists
        </h1>
        {/* Playlist Cards */}
        <div className="flex flex-wrap gap-1">
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
          <div className="p-2 hover:bg-bgSecondary rounded-lg">
            <div className="flex flex-col text-fgPrimary group">
              <div className="h-32 w-32 bg-bgPrimary rounded-lg mb-1 relative">
                <button className="absolute rounded-full right-2 bottom-2 opacity-0 p-2 group-hover:opacity-100 transition-opacity duration-200 bg-accent ">
                  <Play
                    fill="#060606"
                    color="#060606"
                  />
                </button>
              </div>
              <span className="text-sm px-1">Title</span>
              <span className="text-sm px-1 text-fgSecondary">Artist</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
