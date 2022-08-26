import Image from "next/image";

export default function Loading({ show }) {
  if (show) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: "6666" }}>
        <div className="d-flex align-items-center gap-3 bg-white p-3 pe-4 rounded-3">
          <Image src="/loading.gif" alt="loading" width={32} height={32} />
          <span>Please Wait...</span>
        </div>
      </div>
    );
  }
}
