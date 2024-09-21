import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-orange-500 py-10  ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tighter text-white "
        >
          MernEats.com
        </Link>
        <div className="flex justify-center text-center items-center">
          <div className="font-bold tracking-tighter text-white pr-4">
            Terms of Service
          </div>
          <div className="font-bold tracking-tighter text-white">
            Privacy Policy
          </div>
        </div>
      </div>
    </div>
  );
}
