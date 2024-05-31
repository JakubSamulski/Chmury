output "vpc_id" {
    description = "vpc id"
    value = aws_vpc.terra_vpc.id
}

output "subnet_id" {
    description = "private ip(subnet)"
    value = aws_subnet.terra_subnet.id
}
output "IGW_id" {
    description = "internet gateway id"
    value = aws_internet_gateway.terra_IGW.id
}
output "routetable_id" {
    description = "route table id"
    value = aws_route_table.terra_route_table.id
}
output "SG_id" {
    description = "security group id"
    value = aws_security_group.terra_SG.id
}
