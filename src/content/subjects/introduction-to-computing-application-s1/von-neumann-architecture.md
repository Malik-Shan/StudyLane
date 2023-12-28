---
draft: false
title: Von Neumann Architecture
bannerImg: https://media.discordapp.net/attachments/1189918793368084611/1189918836804292618/Computer_Arch.d3c5a6a2.webp?ex=659fe946&is=658d7446&hm=6fd754cb05f64e75e8bbcd1d32b122d644f74127d4bc6f8c77b76cdf5eb73295&=&format=webp
date: 2023-11-22T12:11:11.000Z
tag:
  - blog
  - notes
subject: Introduction To Computing Application
semester: S1
infoType: notes
type: subjects
---

# Von Neumann Architecture

Von Neumann architecture was first published by John von Neumann in 1945.

His computer architecture design consists of a Control Unit, Arithmetic and Logic Unit (ALU), Memory Unit, Registers and Inputs/Outputs.

Von Neumann architecture is based on the stored-program computer concept, where instruction data and program data are stored in the same memory. This design is still used in most computers produced today.

![Von Neumann Architecture](https://media.discordapp.net/attachments/1189918793368084611/1189918837353742386/Von-Neumann-Architecture-Diagram.webp?ex=659fe946&is=658d7446&hm=d338e73dbe75b51c8a10e37e09aeeef2d86d8d0de5e9a0e97a685bb471aa4319&=&format=webp)

### Central Processing Unit (CPU)

The Central Processing Unit (CPU) is the electronic circuit responsible for executing the instructions of a computer program.

It is sometimes referred to as the microprocessor or processor.

The CPU contains the ALU, CU and a variety of registers.

### Registers

Registers are high speed storage areas in the CPU. All data must be stored in a register before it can be processed.

| Abbrevation | Stands For                   | Purpose                                                     |
| ----------- | ---------------------------- | ----------------------------------------------------------- |
| MAR         | Memory Address Register      | Holds the memory location of data that needs to be accessed |
| MDR         | Memory Data Register         | Holds data that is being transfered to or from memory       |
| AC          | Accumulator                  | Where intermediate arithmetic and logic results are stored  |
| PC          | Program Counter              | Contains the address of the next instruction to be executed |
| CIR         | Current Instruction Register | Contains the current instruction during processing          |

### Arithmetic and Logic Unit (ALU)

The ALU allows arithmetic (add, subtract etc) and logic (AND, OR, NOT etc) operations to be carried out.

### Control Unit (CU)

The control unit controls the operation of the computer’s ALU, memory and input/output devices, telling them how to respond to the program instructions it has just read and interpreted from the memory unit.

The control unit also provides the timing and control signals required by other computer components
