package main

import "fmt"

func removeDups(nums []int) {
  w := 1
  for r := 1; r < len(nums); r++{
    if nums[r] != nums[r - 1] {
      nums[w] = nums[r]
      w++
    }
  }
}

func main() {
  dups := []int{1, 1, 2, 2, 2, 4, 4, 5, 5, 5, 7, 7, 8}
  removeDups(dups)
  fmt.Println(dups)

}
