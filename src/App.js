import './App.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./pages/Root";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Videos from "./pages/videos/Videos";
import VideoExplanation from "./pages/videoexplanation/VideoExplanation";
import VideosDetail from "./pages/videosdetail/VideosDetail";

function App() {
  const queryClient = new QueryClient();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "/videos", element: <Videos /> },
        {
          path: "/videos/explanation/:videoId",
          element: <VideoExplanation />,
        },
        { path: "/videos/:keyword", element: <VideosDetail /> },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>

        </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
