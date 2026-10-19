import Faq from "./Faq";

export const metadata = { title: "Help & Support | Software Studio" };

export default function Help() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold">Help & Support</h1>
      <p className="mb-6 mt-2 text-mute">Find fixes for common problems.</p>
      <Faq />
    </div>
  );
}
