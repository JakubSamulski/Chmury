resource "aws_vpc" "terra_vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    name = "my_vpc"
  }
}

resource "aws_internet_gateway" "terra_IGW" {
  vpc_id = aws_vpc.terra_vpc.id
  tags = {
    name = "my_IGW"
  }
}

resource "aws_route_table" "terra_route_table" {
  vpc_id = aws_vpc.terra_vpc.id
  tags = {
    name = "my_route_table"
  }
}

resource "aws_route" "terra_route" {
  destination_cidr_block = "0.0.0.0/0"
  gateway_id  = aws_internet_gateway.terra_IGW.id
  route_table_id = aws_route_table.terra_route_table.id
}

resource "aws_subnet" "terra_subnet" {
  vpc_id = aws_vpc.terra_vpc.id
  cidr_block = "10.0.1.0/24"
  availability_zone = var.availability_zone
  map_public_ip_on_launch = true


  tags = {
    name = "my_subnet"
  }
}

resource "aws_route_table_association" "terra_assoc" {
  subnet_id = aws_subnet.terra_subnet.id
  route_table_id = aws_route_table.terra_route_table.id
}

resource "aws_security_group" "terra_SG" {
  name        = "sec_group"
  description = "security group for the EC2 instance"
  vpc_id      = aws_vpc.terra_vpc.id
  ingress = [
    {
      description      = "http traffic"
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0", aws_vpc.terra_vpc.cidr_block]
      ipv6_cidr_blocks  = []
      prefix_list_ids   = []
      security_groups   = []
      self              = false
    },
    {
      description      = "ssh"
      from_port        = 22
      to_port          = 22
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0", aws_vpc.terra_vpc.cidr_block]
      ipv6_cidr_blocks  = []
      prefix_list_ids   = []
      security_groups   = []
      self              = false
    },
    {
      description      = "backend"
      from_port        = 3000
      to_port          = 3000
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0", aws_vpc.terra_vpc.cidr_block]
      ipv6_cidr_blocks  = []
      prefix_list_ids   = []
      security_groups   = []
      self              = false
    }
  ]
  egress = [
    {
      from_port        = 0
      to_port          = 0
      protocol         = "-1"
      cidr_blocks      = ["0.0.0.0/0"]
      description      = "Outbound traffic rule"
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
    }
  ]
  tags = {
    name = "allow_web"
  }
}

resource "aws_network_interface" "terra_net_interface" {
  subnet_id = aws_subnet.terra_subnet.id
  security_groups = [aws_security_group.terra_SG.id]
}
