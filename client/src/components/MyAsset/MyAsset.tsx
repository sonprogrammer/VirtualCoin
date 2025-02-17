import { AssetCircleGraph } from "../AssetCircleGraph"
import { AssetList } from "../AssetList"
import { AssetResultTextComponent } from "../AssetResultTextComponent"




const MyAsset = () => {
  return (
    <div>
        <div className="w-full flex">
            <div className="assetResultC w-[60%]">
                <AssetResultTextComponent />
            </div>
            <div className="원형그래프 w-[40%]">
                <AssetCircleGraph />
            </div>
        </div>
      <div>
        <div className="border-t-2 py-2 pl-5">보유자산 목록</div>
        <AssetList />
      </div>
    </div>
  )
}

export default MyAsset
