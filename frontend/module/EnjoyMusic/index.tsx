import Button from "../../components/Button"
import Image from "next/image"


const EnjoyMusic = () => {
  return (
    <div className="containers py-[6px] sm:!pt-[16px] flex items-center justify-between h-[160px] sm:h-[420px] !px-0 sm:!px-[64px] mb-[172px] bg-[#282828] rounded-[10px]">
      <Image priority src={"/music-img.png"} alt="Music image" width={518} height={493} className="!w-[188px] !h-[173px] sm:w-[288px] sm:h-[273px] lg:!w-[518px] lg:!h-[493px] mt-[25px] sm:mt-[50px]" style={{width: "518px", height: "493px"}}/>
      <div className="w-[438px]">
        <h2 className="font-bold text-[14px] sm:text-[32px] leading-[16px] sm:leading-[38px] text-white mb-[21px]">Musiqa zavqini his qilish uchun ko'p mablag' sarflash shart emas!</h2>
        <Button type="button" extrClass="!text-[11px] sm:text-[16px] !py-[6px] sm:!py-[12px] !bg-white !text-[#282828] !w-[94px] sm:!w-[161px]" title="Batafsil" />
      </div>
    </div>
  )
}
export default EnjoyMusic