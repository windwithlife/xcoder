

module.exports  =
{
    service_name: "test",
    module:'test',
    namespace:"gs.v1",
    operations:[{name:'sayHello',
    requestType: {
        id:int,
        name:string,
        text:string
    },
    responseType:{
        tables:"List<XTable>",
    }},
        {name:'testHello',
            requestType:{

            },
            responseType:{

        }}]
}