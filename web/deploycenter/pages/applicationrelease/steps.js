import { Steps, Button, message, Divider, Progress } from 'antd';
import { Component } from 'react';

const { Step } = Steps;

const StepsDef = [
  {
    title: '构建镜像',
    envType: "IMAGE",
    needRollingBack: false,
    rollingBackText: "回滚代码状态",
    status: "waiting",
  },
  {
    title: 'UAT部署',
    envType: "UAT",
    needRollingBack: false,
    rollingBackText: "回滚到镜像状态",
    status: "waiting",
  },
  {
    title: '生产部署',
    envType: "PROD",
    needRollingBack: true,
    rollingBackText: "回滚到UAT",
    status: "waiting",
  },
  {
    title: '完成',
    envType: "PROD",
    needRollingBack: true,
    rollingBackText: "生产环境",
    status: "waiting",
  },
];

class StepComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showProcessBar: false,
    };
    this.showProcessBar = false;
    this.stepInfo = StepsDef[0];

  }

  deploy = () => {
    this.showProcessBar = true;
    this.setState({
      showProcessBar: true,
    })
    if (this.props.onDeploy) {
      const envType = this.stepInfo.envType;
      this.props.onDeploy(envType, this.props.actionId);
    }
  };

  filterData(source) {
    let result = Object.assign({}, source);
    if (!source.currentStepIndex) {
      console.log("invalid input data");
      result.currentStepIndex = 0;
    }
    if (source.currentStepIndex >= StepsDef.length - 1) {
      console.log("invalid input data");
      result.currentStepIndex = StepsDef.length - 2;
    }
    if (!source.currentStepStatus) {
      result.currentStepStatus = 'waiting';
    }
    return result;
  }
  render = () => {
    let that = this;
    let params = this.filterData(this.props);
    let currentStep = params.currentStepIndex;
    let currentStepStatus = params.currentStepStatus;
    
    StepsDef[currentStep].status = currentStepStatus;
    

    if ((currentStepStatus === "finish") && (currentStep < StepsDef.length - 1)) {
      currentStep = currentStep + 1;
      currentStepStatus = "waiting";
      this.showProecessBar = false;
     
    }
     this.stepInfo = StepsDef[currentStep];
    console.log("current step ==>" + currentStep);
    console.log(this.stepInfo);
    return (
      <>
        <Steps current={currentStep} status={currentStepStatus}>
          {StepsDef.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        {this.showProcessBar && (
          <Progress percent={50} status="active" />
        )}

        <Divider dashed />
        <Button type="primary" onClick={() => that.deploy()}>
          {that.stepInfo.title}
        </Button>
        {that.stepInfo.needRollingBack && (<Button type="primary" onClick={() => that.rollingBack()}>
          {that.stepInfo.rollingBackText}
        </Button>)}

      </>)
  }
}
export default StepComponent;