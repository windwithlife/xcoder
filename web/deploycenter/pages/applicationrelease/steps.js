import { Steps, Button, message,Divider,Progress} from 'antd';

const { Step } = Steps;

const steps = [
  {
    title: '构建镜像',
    content: '开始构建',
    envType: "TEST",
    needRollingBack: false,
    rollingBackText: "回滚代码状态",
    status: "waiting",
  },
  {
    title: 'UAT部署',
    content: 'UAT部署',
    envType: "UAT",
    needRollingBack: false,
    rollingBackText: "回滚到镜像状态",
    status: "waiting",
  },
  {
    title: '生产部署',
    content: '生产部署',
    envType: "PROD",
    needRollingBack: true,
    rollingBackText: "回滚到UAT",
    status: "waiting",
  },
];

const App = (props) => {
   let currentStepIndex = 0
   let currentStepStatus = "process";
   let showProcessBar = false;
   if ((props) && (props.currentStepIndex) && (props.currentStepStatus)){
       
        if(props.currentStepStatus == "finish"){
            if(props.currentStepIndex ==  steps.length -1){
                //currentStepIndex = currentStepIndex + 1;
                currentStepStatus = "finish";
            }else if(props.currentStepIndex < steps.length -1){
                currentStepIndex = props.currentStepIndex + 1;
            }
           
            
        }else{
            steps[currentStepIndex].status = currentStepStatus;
        }
   }
  
   const [current, setCurrent] = React.useState(currentStepIndex);
   const [processBar, setProcess] = React.useState(showProcessBar);
  
  const deploy = () => {
     setProcess(true);
     if(props.onDeploy){
        const envType = steps[current].envType;
        props.onDeploy(envType);
     }     
  };

  const rollingBack = () => {
    setCurrent(current - 1);
    if(current == 0){

    }
  
    
    
    
  };

  return (
      
    <>
      <Steps current={current} status={currentStepStatus}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      {processBar && (
          <Progress percent={50} status="active" />
        )}
      
      <Divider dashed />
      <div className="steps-action">
      <Button type="primary" onClick={() => deploy()}>
            {steps[current].title}
      </Button>
        
        {steps[current].needRollingBack && (
          <Button style={{ margin: '0 8px' }} onClick={() => rollingBack()}>
            {steps[current].rollingBackText}
          </Button>
        )}
      </div>
    </>
  );
};

export default App;