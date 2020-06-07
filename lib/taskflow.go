package lib

import (
	"time"
)

type TaskFlow struct {
	current int
	Delay   int
	tasks   []TaskRunner
	ErrorHandler func(string)
	FinishHandler func()
}

type TaskRunner func(*TaskFlow)

func MakeFlow(tasks []TaskRunner) TaskFlow {
	return TaskFlow{
		current: 0,
		Delay:   200,
		tasks:   tasks,
		ErrorHandler: nil,
		FinishHandler: nil,
	}
}

func (t *TaskFlow) AddTask(tasks TaskRunner) {
	t.tasks = append(t.tasks, tasks)
}

func (t *TaskFlow) AddTasks(tasks []TaskRunner) {
	t.tasks = append(t.tasks, tasks...)
}

func (t *TaskFlow) Error(msg string) {
	if t.ErrorHandler != nil {
		t.ErrorHandler(msg)
	}
}

func (t *TaskFlow) Next() {
	time.Sleep(time.Duration(t.Delay) * time.Millisecond)
	// fmt.Println("执行任务", t.current , "/", len(t.tasks))
	if t.current < len(t.tasks) {
		t.current++
		t.tasks[t.current-1](t)
	} else {
		if t.FinishHandler != nil {
			t.FinishHandler()
		}
	}
}
