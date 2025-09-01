import { Kafka } from "kafkajs";

const kafka =new Kafka({
    clientId:"demo-consumer",
    brokers:["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: 'demo-group' });

const run=async()=>{
    await consumer.connect()
    await consumer.subscribe({
        topic:"demo-topic",
        fromBeginning:true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log(`Consumed: ${message.value.toString()}`);
        },
      });
    };

run().catch(console.error);
