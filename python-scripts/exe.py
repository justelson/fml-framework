from script import math 

#solve qaudratic equation by splitting the general formular
#x = (-b +- sqrt(b^2 - 4ac)) / 2a

def solve_p1(b):
    return -b

def solve_p2(b, a):
    return 2 * a

def solve_p3(b, a, c):
    return (b ** 2) - (4 * a * c)

def fully_solve(a, b, c):
    part1 = solve_p1(b)
    part2 = solve_p2(b, a)
    part3 = solve_p3(b, a, c)

    if part3 < 0:
        return "No real roots"

    sqrt_part3 = math.power(part3, 0.5)
    root1 = (part1 + sqrt_part3) / part2
    root2 = (part1 - sqrt_part3) / part2

    return root1, root2


#test quad solver
print(fully_solve(1, -3, 2))  # Expected output: (2.0, 1.0)




























"""print("Addition:", math.add(10, 5))
print("Subtraction:", math.subtract(10, 5))
print("Multiplication:", math.multiply(10, 5))
print("Division:", math.divide(10, 5))
print("Power:", math.power(10, 5))"""