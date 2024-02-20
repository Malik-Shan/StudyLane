---
draft: false
title: Introduction To Programming
bannerImg: https://media.discordapp.net/attachments/1189918793368084611/1197259554774319104/applications-of-computer-programming.webp?ex=65ba9dd9&is=65a828d9&hm=62101f63cbb4d9981a8b8597d0296ee3a2c4d3c5836b54e15d58887924436a53&=&format=webp
date: 2024-01-17T19:20:05.370Z
tag:
  - notes
  - blog
subject: Programming Fundamentals
semester: S1
infoType: blog
type: subjects
---

# Introduction To Programming

### Programming:

**"Programming refers to a technological process for telling a computer which tasks to perform in order to solve problems."**

Computer programming or coding is the composition of sequences of instructions, called programs, that computers can follow to perform tasks. It involves designing and implementing algorithms, step-by-step specifications of procedures, by writing code in one or more programming languages

### How a Program Works:

We know that the CPU is the most important component in the computer becuase it is the part of the computer that run the programs. Sometimes the CPU is called the "computer's brain", and is described as being "smart". Although these are common metaphors, you should understand that CPU is not a brain, and is not smart. CPU is an eletronic device that is designed to do specific things. In particular, the CPU is desgined to perform operations such as followings:

- Reading a piece of data from main memory
- Adding two numbers
- Subtracting one number from other
- Multiplying two numbers
- Dividing one number by another
- Moving one piece of data from one memory location to other
- Determinig weather one value is equal to other value
- And so forth...

As you can see from the list, the CPU performs simple operations on pieces of data. The CPU does nothing on its own, however. It has to be told what to do, and that's the purpose of a program. A program is nothing more than a list of intructions that cause the CPU to perform operations. Each instruction in a program is a command that tells the CPU to perform a specific operation. Here’s an example of an instruction that might appear in a program:
**10110000**

To you and me, this is only a series of 0s and 1s. To a CPU, however, this is an instruction to perform an operation.1 It is written in 0s and 1s because CPUs only understand instructions that are written in machine language,and machine language instructions are always written in binary.

A machine language instruction exists for each operation that a CPU is capable of performing. For example, there is an instruction for adding numbers; there is an instruction for subtracting one number from another; and so forth. The entire set of instructions that a CPU can execute is known as the CPU’s instruction set.
The machine language instruction that was previously shown is an example of only one
instruction. It takes a lot more than one instruction, however, for the computer to do anything meaningful. Because the operations that a CPU knows how to perform are so basic in nature, a meaningful task can be accomplished only if the CPU performs many operations. For example, if you want your computer to calculate the amount of interest that you will earn from your savings account this year, the CPU will have to perform a large number of instructions, carried out in the proper sequence. It is not unusual for a program to contain thousands, or even a million or more machine language instructions.

### Fetch-Decode-Execute Cycle:

Programs are usually stored on a secondary storage device such as a disk drive. When you install a program on your computer, the program is typically downloaded from a Web site, or installed from an online app store.

Although a program can be stored on a secondary storage device such as a disk drive, it has to be copied into main memory, or RAM, each time the CPU executes it. For example, suppose you have a word processing program on your computer’s disk. To execute the program you use the mouse to double-click the program’s icon. This causes the program to be copied from the disk into main memory. Then, the computer’s CPU executes the copy of the program that is in main memory.

When a CPU executes the instructions in a program, it is engaged in a process that is known as the fetch-decode-execute cycle. This cycle, which consists of three steps, is repeated for each instruction in the program. The steps are:

1. Fetch. A program is a long sequence of machine language instructions. The first step of the cycle is to fetch, or read, the next instruction from memory into the CPU.

2. Decode. A machine language instruction is a binary number that represents a command that tells the CPU to perform an operation. In this step the CPU decodes the instruction that was just fetched from memory, to determine which operation it should perform.

3. Execute. The last step in the cycle is to execute, or perform, the operation.

### Types of Languages:

A computer's CPU can only understand intructions that are written in machine language. Because people find it very difficult to write entire programs in machine language, other programming languages have been invented.

The languages are classified into two categories or levels

- Low Level Language
- High Level Language

### Low Level Language:

A low-level language also referred to as "computer's native language" is a programming language that deals with a computer’s hardware components and constraints. It has no (or only a minute level of) abstraction in reference to a computer and works to manage a computer’s operational semantics.

- **Machine Language**

  Machine Language is an example of low level language because it works closer to the components. Computers can only execute programs that are written in machine language. As previously mentioned, a program can have thousands, or even a million or more binary instructions, and writing such a program would be very tedious and time consuming. Programming in machine language would also be very difficult because putting a 0 or a 1 in the wrong place will cause an error.

- **Assembly Language**

  Although a computer’s CPU only understands machine language, it is impractical for people to write programs in machine language. For this reason, assembly language was created in the early days of computing2 as an alternative to machine language. Instead of using binary numbers for instructions, assembly language uses short words that are known as mnemonics. For example, in assembly language, the mnemonic add typically means to add numbers, mul typically means to multiply numbers, and mov typically means to move a value to a location in memory. When programmers use assembly language to write programs, they can write short mnemonics instead of binary numbers.

Assembly language programs cannot be executed by the CPU, however. The CPU only understands machine language, so a special program known as an assembler is used to translate an assembly language program to a machine language program. The machine language program that is created by the assembler can then be executed by the CPU.

Although assembly language makes it unnecessary to write binary machine language instructions, it is not without difficulties. Assembly language is primarily a direct substitute for machine language, and like machine language, it requires that you know a lot about the CPU. Assembly language also requires that you write a large number of instructions for even the simplest program. Because assembly language is so close in nature to machine language, it is referred to as a low-level language.

### High Level Language:

A high-level language is any programming language that enables development of a program in a much more user-friendly programming context and is generally independent of the computer's hardware architecture.

In the 1950s, a new generation of programming languages known as high-level languages began to appear. A high-level language allows you to create powerful and complex programs without knowing how the CPU works, and without writing large numbers of low-level instructions. In addition, most high-level languages use words that are easy to understand. For example, if a programmer were using COBOL (which was one of the early high-level languages created in the 1950s), the programmer would write the following instruction to display the message “Hello world” on the computer screen:

**Display ”Hello world”**

Doing the same thing in assembly language would require several instructions, and an intimate knowledge of how the CPU interacts with the computer’s video circuitry. As you can see from this example, high-level languages allow programmers to concentrate
on the tasks they want to perform with their programs rather than the details of how the CPU will execute those programs.

Since the 1950s, thousands of high-level languages have been created. If you are working toward a degree in computer science or a related field, you are likely to study one or more of these languages.

Each high-level language has its own set of words that the programmer must learn in order to use the language. The words that make up a high-level programming language

**Examples:**
Python, JAVA,C++, C# etc

### Programming Languages

- **Ada**

  Ada was created in the **1970s**, primarily for applications used by the U.S. Department of Defense. The language is named in honor of **Ada Lovelace**, a 19th century mathematician who published an algorithm that is considered by many to be the **first computer program.**

- **BASIC**

  Beginners All-purpose Symbolic Instruction Code is a **general-purpose language** that was originally designed in the early **1960s** to be simple enough for beginners to learn. Today, there are many different versions of BASIC.

- **FORTRAN**

  **FOR**mula **TRAN**slator was the **first high-level programming language**. It was designed in the **1950s** for performing complex mathematical calculations.

- **COBOL**

  Common Business-Oriented Language was created in the **1950s**, and was designed for business applications.

- **Pascal**

  Pascal was created in **1970**, and was originally designed for teaching programming. The language was named in honor of the mathematician, physicist, and philosopher **Blaise Pascal**.

- **C and C++**

  C and C++ (pronounced “c plus plus”) are powerful, general-purpose languages developed at Bell Laboratories. The C language was created in **1972** and the C++ language was created in **1983**.

- **C#**

  Pronounced “c sharp.” This language was created by Microsoft around the year **2000** for developing applications based on the Microsoft .NET platform.

- **JAVA**

  Java was created by Sun Microsystems (a company that is now owned by Oracle) in the early **1990s**. It can be used to develop programs that run on a single computer or over the Internet from a Web server.

- **JavaScript**

  JavaScript, created in the **1990s**, can be used in Web pages. Despite its name, JavaScript is not related to Java.

- **Python**

  Python is a general-purpose language created in the early **1990s**. It has become popular in business and academic applications.

- **Ruby**

  Ruby is a general-purpose language that was created in the **1990s**. It is increasingly becoming a popular language for programs that run on Web servers.

- **Rust**

  The Rust programming language is designed for high performance, memory safety, and concurrent execution. It was announced in **2010** by Mozilla Research.

- **Visual Basic**

  Visual Basic (commonly known as VB) is a Microsoft programming language and software development environment that allows programmers to create Windows®-based applications quickly. VB was originally created in the early **1990s**.

### Compilers and Interpreters:

**"A compiler is a program that translates a high-level language program into a separate machine language program. The machine language program can then be executed any time it is needed. Compiling and executing are two different processes."**

Because the CPU understands only machine language instructions, programs that are written in a high-level language must be translated into machine language. Once a program has been written in a high-level language, the programmer will use a compiler or an interpreter to make the translation.

**"An interpreter is a program that both translates and executes the instructions in a high-level language program. As the interpreter reads each individual instruction in the program, it converts it to a machine language instruction and then immediately executes it."**

The statements that a programmer writes in a high-level language are called source code, or simply code. Typically, the programmer types a program’s code into a text editor and then saves the code in a file on the computer’s disk. Next, the programmer uses a compiler to translate the code into a machine language program, or an interpreter to translate and execute the code. If the code contains a syntax error, however, it cannot be translated. A
syntax error is a mistake such as a misspelled key word, a missing punctuation character, or the incorrect use of an operator. When this happens the compiler or interpreter displays an error message indicating that the program contains a syntax error. The programmer corrects the error and then attempts once again to translate the program.

Programs that are compiled generally execute faster than programs that are interpreted because a compiled program is already translated entirely to machine language when it is executed. A program that is interpreted must be translated at the time it is executed.

### Introduction:

Linkers are essential tools in software development that play a crucial role in the process of converting source code into executable programs. They act as the bridge between various source code modules and libraries, integrating them into a single executable file that can be run by a computer system.

### Functionality

**Symbol Resolution:** Linkers resolve symbolic references between different modules by matching symbols defined in one module with their corresponding references in another module. This process ensures that all references are properly linked to their respective definitions.

**Address Binding:** Linkers assign final memory addresses to program variables and functions, a process known as address binding. This step involves resolving relative addresses and ensuring that each symbol is assigned a unique memory location within the executable file.

**Code Optimization:** Some linkers perform code optimization techniques such as dead code elimination, function inlining, and code rearrangement to improve the efficiency and performance of the final executable.

**Dynamic Linking:** Linkers also support dynamic linking, where certain libraries or modules are linked at runtime rather than at compile time. This allows for more flexible and efficient memory usage, as shared libraries can be loaded into memory only when needed.

**Executable Generation**: The final output of the linking process is an executable file that can be directly executed by the operating system. This file contains all the necessary code and resources required to run the program.

### Importance

Linkers play a critical role in software development for several reasons:

- They enable modular programming by allowing developers to break down large programs into smaller, manageable modules.
- Linkers facilitate code reuse by linking external libraries and modules into multiple programs.
- They ensure the correctness and integrity of the executable by resolving dependencies and verifying symbol references.
- Linkers contribute to the efficiency and performance of the final executable through optimization techniques.
