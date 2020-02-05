package kubeseal

import (
	"fmt"
	"io"
	"os/exec"
)

type KubesealCmd struct {
	Args KubesealArgs
}
type KubesealArgs struct {
	ControllerName      string
	ControllerNamespace string
	OutputFormat        string
}

// NewCmd()
func NewCmd() *KubesealCmd {
	return &KubesealCmd{}
}

// Seal
// TODO refactor
// Search best way to exec command
// To change: err is in stdout
func (cmd *KubesealCmd) Seal(secret string) ([]byte, error) {
	args := []string{
		"--controller-name",
		cmd.Args.ControllerName,
		"--controller-namespace",
		cmd.Args.ControllerNamespace,
		"-o",
		cmd.Args.OutputFormat,
	}

	command := exec.Command("kubeseal", args...)

	stdin, err := command.StdinPipe()
	if err != nil {
		return nil, err
	}

	go func() {
		defer stdin.Close()
		io.WriteString(stdin, secret)
	}()

	out, err := command.CombinedOutput()
	fmt.Println(string(out))
	if err != nil {
		return nil, err
	}
	return out, nil
}
