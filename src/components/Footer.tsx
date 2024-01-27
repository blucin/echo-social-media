import siteConfig from "@/site.config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center h-9 w-full border-t z-50 fixed bottom-0 bg-background">
      <p className="text-xs text-gray-500">
        Built by{" "}
        <Link
          href={siteConfig.author.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {siteConfig.author.shortName}
        </Link>
        , The source code is available on{" "}
        <Link
          href={siteConfig.siteGithubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          GitHub
        </Link>
      </p>
    </footer>
  );
}