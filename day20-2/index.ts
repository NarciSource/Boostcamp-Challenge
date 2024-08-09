import VirtualMemory from "./VirtualMemory";

const virtual_memory = new VirtualMemory();

virtual_memory.init(0xf000);
console.log(virtual_memory);

const address = virtual_memory.alloc(5, 10);
console.log("Allocated address", address);

virtual_memory.write(address, [0x68, 0x65, 0x6c, 0x6c, 0x6f, 0x77, 0x6f, 0x77]);

const value = virtual_memory.read(address);
console.log("Value", value);

console.log("Peek", virtual_memory.peek());

virtual_memory.free(address);
const after_value = virtual_memory.read(address);
console.log("Value after freeing memory", after_value);

const [pageInCount, pageOutCount] = virtual_memory.report();
console.log(`InCount: ${pageInCount}, OutCount: ${pageOutCount}`);
