import landinImage from "../assets/landing.png";
import downloadImage from "../assets/appDownload.png";
const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg py-8 shadow-md flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-500">
          Tuck into a takeaway today
        </h1>
        <div className="text-xl">Food is just a click away</div>
      </div>
      <div className="grid md:grid-cols-2 gap-5 ">
        <img src={landinImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="font-bold text-3xl tracking-tighetr">
            Order takeaway even faster!
          </div>
          <div className=" tracking-tighetr">Download the MernEats App !!!</div>
          <img src={downloadImage} />
        </div>
      </div>
    </div>
  );
};
export default HomePage;
