import { shimmer_card_unit } from "../constants";

// Shimmer card to display with animation
const CardShimmer = () => {
  return (
    <div className="basis-[250px] mob:basis-[150px] p-2.5 mb-2.5 animate-pulse">
      <div className="h-[144px] w-[230px] bg-bio mob:w-[130px] mob:h-[81px]"></div>
      <div className="w-3/5 mt-2.5 h-[115px] bg-bio"></div>
      <div className="w-4/5 mt-1 h-[15px] bg-bio"></div>
      <div className="w-full mt-[18px] h-[15px] bg-bio"></div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="flex flex-wrao gap-5 justify-evenly">
      {new Array(shimmer_card_unit).fill(0).map((element, index) => {
        return <CardShimmer key={index} />;
      })}
    </div>
  );
};

export const MenuShimmer = () => {
return (
  <div className="shimmer">hello shimmer</div>
)
}
export default Shimmer;