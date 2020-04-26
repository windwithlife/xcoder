import model from './models/model.js';
import { ListView,Button } from 'antd-mobile';
import {

    Link

} from 'react-router';

const Demo = React.createClass({
    contextTypes: {
        router: React.PropTypes.object
    },
    getInitialState() {

        this.rdata = [];
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        return {
            dataSource: dataSource.cloneWithRows(this.rdata),
            isLoading: false,
        };
    },

    onEndReached(event) {
        // load new data
        console.log('reach end', event);

    },

    onDelete(rowId){
        var that = this;
        model.removeById(rowId, function () {
            console.log(rowId);
            that.refresh();

        });
    },

    componentWillMount()
    {
        this.refresh();
    },

    refresh(){
        var that = this;
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        var params = {};
        params.name = "test";

        //params.unitId = this.props.location.query.unitId;
        console.log(JSON.stringify(params));
        model.queryAll(function (response) {
            if (response) {
                console.log(JSON.stringify(response.data));

            that.setState({
                dataSource: dataSource.cloneWithRows(response.data),
                isLoading: false,
            });
        }
    });
},
render()
{
    var newPath = "/<%=data.endName%>/<%=data.moduleName%>/add";
    const renderHeader = () => (
        <div>
            <span>header</span>
            <Link to={newPath}><span style={styles.headerLink}>新增</span></Link>
        </div>
    );
    const separator = (sectionID, rowID) => (
        <div key={`${sectionID}-${rowID}`} style={styles.listSeparator}
      />
    );
    const row = (rowData, sectionID, rowID) => {
        var obj = {title: rowData.name, des: rowData.text};
        var itemPath = "/<%=data.endName%>/<%=data.moduleName%>/detail?id=" + rowData.id;
        return (
            <div>
            <Link to={itemPath}>
                <div key={rowID} style={styles.listRow}>
                    <h3 style={styles.listRowTitle}>
                        {obj.title}
                    </h3>

                    <div style={styles.listRowContent}>

                        <div style={{ display: 'inline-block' }}>
                            <p>{obj.des}</p>

                            <p>第<span style={styles.listRowBig}>{rowID}</span>题</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Button onClick={()=> this.onDelete(rowData.id)}>删除</Button>
</div>
        );
    };
    return (
        <div>
            <ListView
                dataSource={this.state.dataSource}
                renderHeader={renderHeader}
                renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完毕'}
        </div>}
                renderRow={row}
                renderSeparator={separator}
                className="am-list"
                pageSize={4}
                scrollRenderAheadDistance={500}
                scrollEventThrottle={20}
                onScroll={() => { console.log('scroll'); }}
                useBodyScroll
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
                />
            <Link to={newPath}><Button className="btn" type="primary">新增</Button></Link>
        </div>
    );
}
});
var styles ={
    headerLink:{marginRight:5,float:'right',fontSize: '1.6em'},
    listRowTitle:{ padding: 2, marginBottom: 8, borderBottom: '1px solid #F6F6F6' },
    listRowContent:{display: '-webkit-box', display: 'flex' },
    listRowBig:{ fontSize: '1.6em', color: '#FF6E27' },
    listRow:{padding: '8px 16px',backgroundColor: 'white'},
    listSeparator:{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      },
}

export default Demo;