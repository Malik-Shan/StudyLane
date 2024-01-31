---
draft: false
title: Stack and Functions
bannerImg: https://media.discordapp.net/attachments/1189918793368084611/1202186810806243360/stack.png?ex=65cc8ab7&is=65ba15b7&hm=c7dd7b203d8fdb06b83651508dfddb5395fe6f7c6fa4d01c4abd2ddf32958755&=&format=webp&quality=lossless
date: 2024-01-31T09:36:35.648Z
tag:
  - blog
subject: Programming Fundamentals
semester: S1
infoType: blog
type: subjects
---

## Introduction

A stack is a linear data structure, a collection of items of the same type.

In a stack, the insertion and deletion of elements happen only at one endpoint. The behavior of a stack is described as “Last In, First Out” (LIFO). When an element is “pushed” onto the stack, it becomes the first item that will be “popped” out of the stack. In order to reach the oldest entered item, you must pop all the previous items.

In this article, you will learn about the concept of stack data structure and its implementation using arrays in C.

## Operations Performed on Stacks

The following are the basic operations served by stacks.

- push: Adds an element to the top of the stack.
- pop: Removes the topmost element from the stack.
- isEmpty: Checks whether the stack is empty.
- isFull: Checks whether the stack is full.
- top: Displays the topmost element of the stack.

## Underlying Mechanics of Stacks

Initially, a pointer (top) is set to keep the track of the topmost item in the stack. The stack is initialized to -1.

Then, a check is performed to determine if the stack is empty by comparing top to -1.

As elements are added to the stack, the position of top is updated.

As soon as elements are popped or deleted, the topmost element is removed and the position of top is updated.

## Implementing Stack in C

Stacks can be represented using structures, pointers, arrays, or linked lists.

This example implements stacks using arrays in C:

```c
#include <stdio.h>

#include <stdlib.h>

#define SIZE 4

int top = -1, inp_array[SIZE];
void push();
void pop();
void show();

int main()
{
    int choice;

    while (1)
    {
        printf("\nPerform operations on the stack:");
        printf("\n1.Push the element\n2.Pop the element\n3.Show\n4.End");
        printf("\n\nEnter the choice: ");
        scanf("%d", &choice);

        switch (choice)
        {
        case 1:
            push();
            break;
        case 2:
            pop();
            break;
        case 3:
            show();
            break;
        case 4:
            exit(0);

        default:
            printf("\nInvalid choice!!");
        }
    }
}

void push()
{
    int x;

    if (top == SIZE - 1)
    {
        printf("\nOverflow!!");
    }
    else
    {
        printf("\nEnter the element to be added onto the stack: ");
        scanf("%d", &x);
        top = top + 1;
        inp_array[top] = x;
    }
}

void pop()
{
    if (top == -1)
    {
        printf("\nUnderflow!!");
    }
    else
    {
        printf("\nPopped element: %d", inp_array[top]);
        top = top - 1;
    }
}

void show()
{
    if (top == -1)
    {
        printf("\nUnderflow!!");
    }
    else
    {
        printf("\nElements present in the stack: \n");
        for (int i = top; i >= 0; --i)
            printf("%d\n", inp_array[i]);
    }
}
```
