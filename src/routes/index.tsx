import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: App,
});

const tabs = [
  {
    label: "Standard",
    icon: (
      // https://iconbuddy.com/game-icons/fairy-wings
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="0 0 512 512"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M152 25c-16.8 0-28 3.51-35.2 8.64c-7.3 5.14-11.1 11.95-12.7 21.34c-3.1 18.79 5.3 47.62 21.7 76.62c14.9 26.2 35.9 52.6 58.5 73.6c18.5 12.7 38.4 25.1 60.1 35.6c-25.1-45.3-38.9-96.8-51-138.3c-7-23.9-13.5-44.59-20.6-58.37c-3.6-6.89-7.3-11.96-10.8-14.98c-3.4-3.01-6.2-4.15-10-4.15zm208 0c-3.8 0-6.6 1.14-10 4.15c-3.5 3.02-7.2 8.09-10.8 14.98c-7.1 13.78-13.6 34.47-20.6 58.37c-12.1 41.5-25.9 93-51 138.3c21.7-10.5 41.6-22.9 60.1-35.6c22.6-21 43.6-47.4 58.5-73.6c16.4-29 24.8-57.83 21.7-76.62c-1.6-9.39-5.4-16.2-12.7-21.34C388 28.51 376.8 25 360 25zM51.17 139.9c-3.33.1-6.23 1.1-9.03 2.9c-11.19 11.8-17.01 22.5-19.03 31.8c-2.07 9.5-.58 17.8 3.91 26c8.99 16.5 31.6 32.1 60.12 43.1c22.16 8.5 47.66 14.3 72.16 16.9c23.1-3 46.1-5.8 67-8.8c-45.3-23.8-82.6-54-112.8-77c-17.83-13.7-33.31-24.8-45.61-30.4c-6.15-2.8-11.05-4.3-15.26-4.5h-1.46zm408.23 0c-4.2.2-9.1 1.7-15.3 4.5c-12.3 5.6-27.8 16.7-45.6 30.4c-30.2 23-67.5 53.2-112.8 77c20.9 3 43.9 5.8 67 8.8c24.5-2.6 50-8.4 72.2-16.9c28.5-11 51.1-26.6 60.1-43.1c4.5-8.2 6-16.5 3.9-26c-2-9.3-7.9-20-19-31.8c-2.8-1.8-5.8-2.8-9.1-2.9h-1.4zM243.3 267.2c-41.1 6.7-91.6 11.5-134.6 19.3c-24.01 4.3-45.47 9.7-60.74 16.4c-15.27 6.7-23.08 14.2-24.53 21.5c-2.82 14.4-1.5 24.5 1.9 31.5c3.41 6.9 8.94 11.4 17.35 14.4c16.84 5.9 44.94 3.4 74.52-6.4c4-1.3 8.1-2.8 12.1-4.4c38.5-28.5 81.1-58.1 110.2-84.3c1.4-2.7 2.7-5.4 3.8-8zm25.4 0c1.1 2.6 2.4 5.3 3.8 8c29.1 26.2 71.7 55.8 110.2 84.3c4 1.6 8.1 3.1 12.1 4.4c29.6 9.8 57.7 12.3 74.5 6.4c8.4-3 14-7.5 17.4-14.4c3.4-7 4.7-17.1 1.9-31.5c-1.5-7.3-9.3-14.8-24.6-21.5c-15.2-6.7-36.7-12.1-60.7-16.4c-43-7.8-93.5-12.6-134.6-19.3zm-21.1 24.9c-33.2 29.3-78.9 60.2-117.6 89.4c-22.4 17-42.43 33.3-55.78 47.7c-13.34 14.5-18.69 26.4-17.39 33.1c2.83 14.3 7.86 22.6 13.45 27.1c5.6 4.4 12.33 5.9 21.52 4.4c18.4-2.8 44.5-19 69.2-43.1c24.7-24.2 48.4-55.8 64.7-87.9c12.5-24.5 20.4-49.2 21.9-70.7zm16.8 0c1.5 21.5 9.4 46.2 21.9 70.7c16.3 32.1 40 63.7 64.7 87.9c24.7 24.1 50.8 40.3 69.2 43.1c9.2 1.5 15.9 0 21.5-4.4c5.6-4.5 10.6-12.8 13.5-27.1c1.3-6.7-4.1-18.6-17.4-33.1c-13.4-14.4-33.4-30.7-55.8-47.7c-38.7-29.2-84.4-60.1-117.6-89.4z"
        />
      </svg>
    ),
  },
  {
    label: "Tabs",
    icon: (
      // https://iconbuddy.com/ph/tabs
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="0 0 256 256"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          d="M255.66 165.7a.24.24 0 0 0 0-.08L233.37 91.4A15.89 15.89 0 0 0 218.05 80H208a8 8 0 0 0 0 16h10.05l19.2 64H206l-20.63-68.6A15.89 15.89 0 0 0 170.05 80H160a8 8 0 0 0 0 16h10.05l19.2 64H158l-20.63-68.6A15.89 15.89 0 0 0 122.05 80H38a15.89 15.89 0 0 0-15.37 11.4L.37 165.6v.13A8.1 8.1 0 0 0 0 168a8 8 0 0 0 8 8h240a8 8 0 0 0 7.66-10.3ZM38 96h84.1l19.2 64H18.75Z"
        />
      </svg>
    ),
  },
  {
    label: "Groups",
    icon: (
      // https://iconbuddy.com/codicon/group-by-ref-type
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="0 0 16 16"
        className="w-4 h-4"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M1.5 1h2v1H2v12h1.5v1h-2l-.5-.5v-13l.5-.5zm6 6h-2L5 6.5v-2l.5-.5h2l.5.5v2l-.5.5zM6 6h1V5H6v1zm7.5 1h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM11 6h2V4h-2v2zm-3.5 6h-2l-.5-.5v-2l.5-.5h2l.5.5v2l-.5.5zM6 11h1v-1H6v1zm7.5 2h-3l-.5-.5v-3l.5-.5h3l.5.5v3l-.5.5zM11 12h2v-2h-2v2zm-1-2H8v1h2v-1zm0-5H8v1h2V5z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    label: "Async Infinite",
    icon: (
      // https://iconbuddy.com/akar-icons/infinite
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        width={200}
        height={200}
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.636 16C2.91 16 2 14 2 12s.91-4 3.636-4c3.637 0 9.091 8 12.728 8C21.09 16 22 14 22 12s-.91-4-3.636-4c-3.637 0-9.091 8-12.728 8Z"
        />
      </svg>
    ),
  },
  {
    label: "Actions",
    icon: (
      // https://iconbuddy.com/lucide/badge-alert
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="0 0 24 24"
        className="w-4 h-4"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76ZM12 8v4m0 4h.01"
        />
      </svg>
    ),
  },
  {
    label: "Multiselect",
    icon: (
      // https://iconbuddy.com/heroicons-outline/collection
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={200}
        height={200}
        viewBox="0 0 24 24"
        className="w-4 h-4"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10"
        />
      </svg>
    ),
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-30 px-8 pb-36 antialiased">
      <div className="max-w-4xl">
        {/* Hero Section */}
        <header className="flex items-center justify-between">
          <div className="">
            <h1 className="text-4xl font-medium">Wispe</h1>
            <p className="pt-3 text-gray-300 max-w-md text-pretty">
              A headless autocomplete for React with a Tanstack inspired API and
              rich interactions.
            </p>
          </div>
          <div className="flex items-center space-x-4 pl-24">
            <a
              href="/docs"
              className="text-gray-300 bg-gray-700 px-4 py-2 rounded-xl shadow-gray-600 shadow-sm  font-medium hover:bg-gray-600 hover:text-gray-200 transition-colors"
            >
              Documentation
            </a>

            {/* GitHub icon link */}
            <a
              href="https://github.com/pdevito3/wispe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-gray-200"
              aria-label="View on GitHub"
            >
              {/* https://iconbuddy.com/zmdi/github */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={200}
                height={200}
                viewBox="0 0 432 416"
                className="w-5 h-5"
              >
                <path
                  fill="currentColor"
                  d="M213.5 0q88.5 0 151 62.5T427 213q0 70-41 125.5T281 416q-14 2-14-11v-58q0-27-15-40q44-5 70.5-27t26.5-77q0-34-22-58q11-26-2-57q-18-5-58 22q-26-7-54-7t-53 7q-18-12-32.5-17.5T107 88h-6q-12 31-2 57q-22 24-22 58q0 55 27 77t70 27q-11 10-13 29q-42 18-62-18q-12-20-33-22q-2 0-4.5.5t-5 3.5t8.5 9q14 7 23 31q1 2 2 4.5t6.5 9.5t13 10.5T130 371t30-2v36q0 13-14 11q-64-22-105-77.5T0 213q0-88 62.5-150.5T213.5 0z"
                />
              </svg>
            </a>
          </div>
        </header>

        {/* Example Tabs Section */}
        <section className="w-full mt-12">
          <nav className="flex space-x-2 border-b border-gray-700">
            {tabs.map(({ label, icon }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`px-4 py-2 -mb-px flex items-center space-x-1 focus:outline-none text-sm ${
                  activeTab === label
                    ? "border-b-2 border-blue-500 text-blue-400 font-semibold"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {icon && <span className="pr-1">{icon}</span>}
                <span>{label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-6 p-6 bg-gray-800 rounded-lg h-64 flex items-center justify-center">
            {/* Placeholder for component example */}
            <span className="text-gray-500 italic">
              [Component example for “{activeTab}”]
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
