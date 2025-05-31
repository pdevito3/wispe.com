import { useEffect, useState } from "react";

export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; depth: number }[];
}) {
  const activeId = useHighlightActiveHeader({ headings });

  const getIndentClass = (depth: number) => {
    switch (depth) {
      case 2:
        return "ml-4";
      case 3:
        return "ml-8";
      case 4:
        return "ml-12";
      case 5:
        return "ml-16";
      default:
        return "";
    }
  };

  return (
    <nav className="sticky top-20">
      <h2 className="font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;

          return (
            <li key={heading.id} className={`${getIndentClass(heading.depth)}`}>
              <a
                href={`#${heading.id}`}
                className={`hover:underline transition-colors duration-200 ${
                  isActive ? "text-emerald-500" : "text-slate-500"
                }`}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function useHighlightActiveHeader({
  headings,
}: {
  headings: { id: string; text: string; depth: number }[];
}) {
  const [activeId, setActiveId] = useState(
    headings.length > 0 ? headings[0].id : ""
  );
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "0px 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // Observe each heading element
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup observer on component unmount
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  return activeId;
}
