import { createInterface } from "node:readline/promises"

import searchCommand from "@/commands/search"

const commands: string[] = []
commands.push("search", "add", "remove", "get", "list")

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
})

const read = async () => {
  const answer = await rl.question("anicli @ ")
  if (answer == "quit") rl.close()

  const args = answer.split(" ")
  if (!commands.find(c => c == args[0])) return

  switch (args[0]) {
    case "search": searchCommand(args)
  }

  read()
}

read()