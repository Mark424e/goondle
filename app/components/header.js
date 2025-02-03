import React from "react";
import Image from "next/image";
import Link from "next/link";

const header = () => {
  return (
    <div className="flex justify-center">
      <div className="p-8">
        <Link href="/">
          <Image
            className="transition hover:scale-105"
            src="/logo.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default header;
