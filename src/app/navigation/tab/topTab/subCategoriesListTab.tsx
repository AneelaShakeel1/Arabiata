import RenderTabs, {TTabScreen} from './index';

export default function TopSubCategoriesListTab(props: any) {
  return <RenderTabs screens={props.tabsData} config={{swipeEnabled: true}} />;
}
