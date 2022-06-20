import {RemoveLocallyData} from './DataStorage';
import {AsyncStorageConstant} from '../Constants/AsyncStoreConst';

export async function clearLocalStorage() {
  await RemoveLocallyData(AsyncStorageConstant.ACCESS_TOKEN);
  await RemoveLocallyData(AsyncStorageConstant.USER_DATA);
}
