# create an ubuntu server and install/enable apache2
resource "aws_instance" "terra_ec2" {
  ami = var.ami
  instance_type = var.instance_type
  availability_zone = var.availability_zone
  key_name = "chmury2"
  network_interface {
    device_index = 0
    network_interface_id = aws_network_interface.terra_net_interface.id
  }
  provisioner "remote-exec" {
    inline = [
      "echo 'waiting for ssh'"
    ]
    connection {
      type="ssh"
      user="ubuntu"
      private_key=file(local.private_key_path)
      host= self.public_ip
    }
  }
  provisioner "local-exec" {
    command = "ansible-playbook -i '${self.public_ip},' -u ubuntu --private-key ${local.private_key_path} playbook.yml"
  }
  tags = {
    name = "web_server"
  }
}