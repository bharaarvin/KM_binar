export default function Carddeskripsi({ description }) {
  return (
    <>
      <div className="border p-4 mt-4" style={{ borderRadius: "16px" }}>
        <h2 className="fs-5 m-0 mb-3">Deskripsi</h2>
        <span className="text-secondary" style={{ fontSize: "14px" }}>
          {description
            ? description
            : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae impedit debitis rem dolore, libero nulla doloribus! Iure deserunt, corrupti eligendi natus nihil odio excepturi est aliquid eius fugit laborum asperiores.`}
        </span>
      </div>
    </>
  );
}
