import { Transfer } from 'antd';

export default class  TransferSelect extends React.Component {
  state = {
    mockData: [],
    targetKeys: [],
  };

  componentDidMount() {
    //this.getMock();
    //this.filterData(this.props.data);
  }
  onItemClick=(e)=>{
    let selected = e.target.getAttribute("data-index");
    let selectedValue = e.target.getAttribute("data-value");
    console.log(selected);
    let selectedItem = this.props.data[selected];
    this.props.onItemClick(selectedItem);
      
  }
  shouldComponentUpdate(){
      console.log('should update!');
      console.log(this.props.data);
      return true;
  }
  filterData(originData){
      let targetData = [];
      let that = this;
      if(this.props.filterData){
        originData.map(function(itemData,i){ 
            let result = that.props.filterData(itemData);
            result.key = i;
            targetData.push(result);
        })
      }else{
        targetData = originData; 
      }
     
      return targetData;
  }
  

  handleChange = (targetKeys, direction, moveKeys) => {
      let that = this;
    console.log(targetKeys, direction, moveKeys);
   
    if(this.props.handleChange){
        let results = [];
        targetKeys.forEach(function(item){
            let itemData =that.props.data[item];
            results.push(itemData);
        });
        this.props.handleChange(results);
    }
    this.setState({ targetKeys });
  };

  renderItem = item => {
      //console.log("itemavalue" + item.value);
    const customLabel = (
      <span data-index={item.key} data-value={item.value} onClick={this.onItemClick} className="custom-item">
        {item.title} - {item.description}
      </span>
    );

    return {
      label: customLabel, // for displayed item
      value: item.title, // for title and filter matching
    };
  };

  render() {
    return (
      <Transfer
        dataSource={this.filterData(this.props.data)}
        listStyle={{
          width: 300,
          height: 300,
        }}
        targetKeys={this.state.targetKeys}
        operations={['加到页面中', '从页面删除']}
        onChange={this.handleChange}
        render={this.renderItem}
      />
    );
  }
}
