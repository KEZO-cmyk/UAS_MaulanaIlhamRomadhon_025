from django.shortcuts import render


def index(request):
    context = {
        'nama': 'Maulana Ilham Romadhon',
        'prodi': 'Sains Data',
        'fakultas': 'Sains dan Teknologi',
        'status': 'Mahasiswa',
    }
    return render(request, 'biodata/index.html', context)
