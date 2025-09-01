import { Kafka } from "kafkajs";

const kafka=new Kafka({
    //client ID is just a label for your Kafka client instance, used for identification and monitoring.
    clientId:"demo-producer",
    brokers:["localhost:9092"]
})

const producer=kafka.producer()

const run=async()=>{
    await producer.connect()
    for (let i = 1; i <= 5; i++) {
        await producer.send({
          topic: 'demo-topic',
          messages: [{ value: `Message ${i}` }],
        });
        console.log(`Produced: Message ${i}`);
      }
      await producer.disconnect();
}

run().catch(console.error);

